import { Client, Account, ID, Databases } from 'appwrite';

const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('68b366b40027a8b6b896')

const database = new Databases(client);
const account = new Account(client);
export { ID, client, database, account };