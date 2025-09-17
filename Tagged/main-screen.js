import StyleSheet from './styles/global-stylesheet'
import * as React from "react";
import { View, Text, Modal, TextInput, FlatList, TouchableOpacity } from "react-native";
import { database, account } from './lib/app-write';
import ImageCard from './components/image-card';
import { Button } from 'react-native-web';
import { theme } from './styles/theme';
import { ID, Query, Permission, Role } from 'appwrite';

export default function MainScreen() {
  const [imageList, setImageList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [newImage, setNewImage] = React.useState({ name: '', notes: '' });
  const [tags, setTags] = React.useState([]);
  const [tagInput, setTagInput] = React.useState('');
  const [searchQuery, setSearchQuery] = React.useState('');


  React.useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const user = await account.get();
      const response = await database.listDocuments(
        '68b367890013dd2b8b96',
        'images',
        [Query.equal('userId', user.$id)]
      );
      setImageList(response.documents);
    } catch (error) {
      console.error('Error fetching images: ', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags(prev => [...prev, trimmed]);
    }
    setTagInput('');
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const handleAddImage = async () => {
    if (!newImage.name.trim()) {
      alert('Please fill out all required fields correctly.');
      return;
    }

    try {
      const user = await account.get();
      const created = await database.createDocument(
        '68b367890013dd2b8b96',
        'images',
        ID.unique(),
        {
          name: newImage.name.trim(),
          notes: newImage.notes.trim(),
          userId: user.$id,
          tags: tags, // Save the tags array
        },
        [
          Permission.read(Role.user(user.$id)),
          Permission.update(Role.user(user.$id)),
          Permission.delete(Role.user(user.$id))
        ]
      );

      setImageList(prev => [created, ...prev]);
      setNewImage({ name: '', notes: '' });
      setTags([]);
      setTagInput('');
      setModalVisible(false);
    } catch (err) {
      console.error('Failed to create image, ', err)
    }
  };

  const handleDeleteImage = async (id) => {
    try {
      await database.deleteDocument('68b367890013dd2b8b96', 'images', id);
      fetchImages();
    } catch (err) {
      console.log(err)
    }
  }

  const filteredImages = imageList.filter(image => {
    const query = searchQuery.toLowerCase();
    // Check name, notes, or tags
    const matchesName = image.name.toLowerCase().includes(query);
    const matchesNotes = image.notes?.toLowerCase().includes(query);
    const matchesTags = image.tags?.some(tag => tag.toLowerCase().includes(query));
    return matchesName || matchesNotes || matchesTags;
  });

  return (
    <View style={StyleSheet.screenContainer}>
      <Text style={StyleSheet.loginTitle}>Tagged</Text>
      {loading ? (
        <Text style={{ color: 'white' }}>Loading...</Text>
      ) : (
        <>
          <TextInput
            placeholder="Search by name, notes, or tag..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{
              backgroundColor: '#fff',
              padding: 8,
              borderRadius: 12,
              marginBottom: 12,
              borderWidth: 1,
              borderColor: '#ccc'
            }}
          />
          <FlatList
            data={filteredImages}
            keyExtractor={(image) => image.$id}
            renderItem={({ item }) =>
              <ImageCard
                image={item}
                onDelete={handleDeleteImage}
              />}
            style={{ width: '100%' }}
          />

          <View style={{ width: '95%', marginBottom: 16 }}>
            <Button
              title='Add an Image'
              onPress={() => setModalVisible(true)}
              color={theme.colors.background}
            />
          </View>

          <Modal
            visible={modalVisible}
            animationType='slide'
            transparent={true}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={{
              flex: 1,
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              padding: 20,
            }}>
              <View style={[StyleSheet.modal, { backgroundColor: 'white' }]}>
                <Text style={{ fontSize: 20, marginBottom: 10, fontWeight: 'bold', color: theme.colors.background }}>Add an image</Text>

                <TextInput
                  placeholder='image name'
                  value={newImage.name}
                  onChangeText={(text) => setNewImage({ ...newImage, name: text })}
                  style={StyleSheet.loginUsername}
                />
                <TextInput
                  placeholder='notes (optional)'
                  value={newImage.notes}
                  onChangeText={(text) => setNewImage({ ...newImage, notes: text })}
                  style={StyleSheet.loginUsername}
                />

                {/* Tag input */}
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  <TextInput
                    placeholder='Enter a tag'
                    value={tagInput}
                    onChangeText={setTagInput}
                    style={[StyleSheet.loginUsername, { flex: 1, marginRight: 8 }]}
                  />
                  <Button title='Add Tag' onPress={handleAddTag} />
                </View>

                {/* Display tags as badges */}
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 }}>
                  {tags.map((tag, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleRemoveTag(tag)}
                      style={{
                        backgroundColor: '#ddd',
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        borderRadius: 8,
                        marginRight: 4,
                        marginBottom: 4,
                      }}
                    >
                      <Text>{tag} ×</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
                  <Button title='Cancel' onPress={() => setModalVisible(false)} color='#888' />
                  <Button title='Add Image' onPress={handleAddImage} color={theme.colors.text} />
                </View>
              </View>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
}