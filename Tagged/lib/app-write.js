import { Client, Account, ID, Databases } from 'appwrite';

const client = new Client()
    .setEndpoint('https://fra.coud.appwrite.io/v1')
    .setProject('tagged')

const database = new Databases(client);
const account = new Account(client);
export { ID, client, database, account };