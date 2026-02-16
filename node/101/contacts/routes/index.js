var express = require('express');
var router = express.Router();

let contacts = [
  {
    id: 1,
    first: 'Donald',
    last: 'Trump',
    phone: '1234567890',
    email: 'dtrump@whitehouse.gov'
  },
  {
    id: 2,
    first: 'JD',
    last: 'Vance',
    phone: '9876543210',
    email: 'jd@whitehouse.gov'
  }
];

router.get('/api/contacts', (req, res, next) => {
  res.json(contacts);
});

router.get('/api/contacts/:id', (req, res, next) => {
  const contact = contacts.find(c => c.id === Number(req.params.id));
  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ error: "Contact not found" });
  }
});


router.get('/', function (req, res, next) {
  res.render('layout', {
    title: 'Contact List',
    contacts,
    noContacts: !contacts?.length,
    partials: { content: 'index.hjs' }
  });
});

router.get('/addContact', (req, res, next) => {
  res.render('layout', {
    title: 'Add Contact',
    partials: { content: 'addContact.hjs' }
  });
});

router.post('/addContact', (req, res, next) => {
  req.body.id = contacts.length + 1;

  contacts.push(req.body);
  console.log(contacts);
  res.writeHead(301, {
    location: '/'
  });

  res.end();
});


router.get('/editContact/:id', (req, res, next) => {
  const contact = contacts.find(c => c.id === Number(req.params.id));
  res.render('layout', {
    title: 'Edit Contact',
    partials: { content: 'editContact.hjs' },
    contact: contact
  });
});

router.post('/editContact/:id', (req, res, next) => {
  const id = Number(req.params.id);
  const index = contacts.findIndex(c => c.id === id);
  if (index !== -1) {
    contacts[index] = {
      id,
      first: req.body.first,
      last: req.body.last,
      phone: req.body.phone,
      email: req.body.email

    }
  }

  console.log(contacts);
  res.writeHead(301, {
    location: '/'
  });

  res.end();
});


router.post('/deleteContact/:id', (req, res, next) => {
  contacts = contacts.filter(c => c.id !== Number(req.params.id));

  res.writeHead(301, {
    location: '/'
  });

  res.end();
});

module.exports = router;
