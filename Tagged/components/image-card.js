import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function ImageCard({ image, onDelete }) {
  return (
    <View style={styles.card}>
      
      <Text style={styles.name}>{image.name}</Text>

      {image.notes ? <Text style={styles.notes}>{image.notes}</Text> : null}

      <View style={styles.tagsContainer}>
        {image.tags && image.tags.map((tag, index) => (
          <View key={index} style={styles.tagBadge}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>

      {onDelete && (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(image.$id)}
        >
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5, // for Android shadow
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  notes: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  tagBadge: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 6,
  },
  tagText: {
    fontSize: 12,
    color: '#555',
  },
  deleteButton: {
    alignSelf: 'flex-end',
    marginTop: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#ff4d4d',
    borderRadius: 8,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});