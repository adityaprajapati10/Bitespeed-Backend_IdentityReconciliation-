import { findContactsByEmailOrPhone, createContact } from '../models/contact.model.js';   

export const identifyContact = async (req, res) => {  
  const { email, phoneNumber } = req.body;  

  if (!email && !phoneNumber) {  
    return res.status(400).json({ error: 'Email or phoneNumber is required' });  
  }  

  try {  
    const contacts = await findContactsByEmailOrPhone(email, phoneNumber);  

    let primaryContact = contacts.find(c => c.linkPrecedence === 'primary') || null;  
    let secondaryContactIds = contacts.filter(c => c.linkPrecedence === 'secondary').map(c => c.id);  
    let emails = [...new Set(contacts.map(c => c.email).filter(e => e))];  
    let phoneNumbers = [...new Set(contacts.map(c => c.phoneNumber).filter(p => p))];  

    if (!primaryContact) {  
      const newContactId = await createContact(email, phoneNumber, null, 'primary');  
      return res.json({  
        contact: {  
          primaryContactId: newContactId,  
          emails: [email].filter(e => e),  
          phoneNumbers: [phoneNumber].filter(p => p),  
          secondaryContactIds: [],  
        },  
      });  
    }  

    if (!contacts.some(c => c.email === email) || !contacts.some(c => c.phoneNumber === phoneNumber)) {  
      const newSecondaryId = await createContact(email, phoneNumber, primaryContact.id, 'secondary');  
      secondaryContactIds.push(newSecondaryId);  
      if (email) emails.push(email);  
      if (phoneNumber) phoneNumbers.push(phoneNumber);  
    }  

    return res.status(200).json({  
      contact: {  
        primaryContactId: primaryContact.id,  
        emails: [...new Set(emails)],  
        phoneNumbers: [...new Set(phoneNumbers)],  
        secondaryContactIds,  
      },  
    });  

  } catch (err) {  
    console.error('Error identifying contact:', err);  
    return res.status(500).json({ error: 'Internal server error' });  
  }  
};