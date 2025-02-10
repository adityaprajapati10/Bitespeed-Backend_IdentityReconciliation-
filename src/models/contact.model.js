import db from '../config/db.js';
export async function findContactsByEmailOrPhone(email, phoneNumber){
  const [rows] = await db.query(
    'SELECT * FROM Contact WHERE email = ? OR phoneNumber = ?',
    [email, phoneNumber]
  );
  return rows;
}

export async function createContact(email, phoneNumber, linkedId, linkPrecedence) {
  const [result] = await db.query(
    'INSERT INTO Contact (email, phoneNumber, linkedId, linkPrecedence, createdAt, updatedAt) VALUES (?, ?, ?, ?, NOW(), NOW())',
    [email, phoneNumber, linkedId, linkPrecedence]
  );
  return result.insertId;
}

export async function updateContactLinkedId(contactId, primaryId) {
  await db.query('UPDATE Contact SET linkedId = ?, linkPrecedence = "secondary", updatedAt = NOW() WHERE id = ?', [primaryId, contactId]);
}