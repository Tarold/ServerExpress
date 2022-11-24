const mongoose = require('mongoose'),
  user = mongoose.model('Users');

exports.getListOfUsers = function (req, res) {
  user
    .find((err, users) => {
      if (err) res.send(err);

      res.json(users);
    })
    .sort({ age: -1 });
  // .limit(2);
};

exports.getUsersByName = function (req, res) {
  user.find(
    {
      name: { $regex: req.params.name, $options: 'i' },
    },
    (err, users) => {
      if (err) res.send(err);

      res.json(users);
    }
  );
};

exports.addUser = function (req, res) {
  let newUser = new user(req.body);
  console.log(req.body);
  newUser.save((err, user) => {
    if (err) res.send(err);

    res.json(user);
  });
};

exports.removeUser = (req, res) => {
  user.remove(
    {
      _id: req.params.userId,
    },
    (err, user) => {
      if (err) res.send(err);
      res.json({
        message: 'user deleted',
      });
    }
  );
};

exports.updateUser = (req, res) => {
  user.findOneAndUpdate(
    {
      _id: req.params.userId,
    },
    req.body,
    { new: true },
    (err, user) => {
      if (err) res.send(err);
      res.json(user);
    }
  );
};

exports.getUsersByAge = (req, res) => {
  user.find(
    {
      age: {
        $gte: req.params.from,
        $lte: req.params.to,
      },
    },
    (err, users) => {
      if (err) res.send(err);
      res.json(users);
    }
  );
};

exports.removeEmpty = (req, res) => {
  user.remove(
    {
      name: { $exists: false },
    },
    (err, user) => {
      if (err) res.status(404).send(err);
      res.json({
        message: 'user deleted',
      });
    }
  );
};

exports.addFieldHeight = (req, res) => {
  user.updateMany(
    {},
    {
      $set: { height: 170 },
    },
    (err, user) => {
      if (err) res.status(404).send(err);
      res.status(200).json({
        message: 'Updated',
      });
    }
  );
};

exports.getHeightsUser = (req, res) => {
  user
    .find((err, users) => {
      if (err) res.send(err);

      res.json(users);
    })
    .sort({ name: 1 });
  // .limit(1);
};

exports.addFieldSex = (req, res) => {
  user.updateMany(
    {},
    {
      $set: { sex: 'male' },
    },
    (err, user) => {
      if (err) res.status(404).send(err);
      res.status(200).json({
        message: 'Updated',
      });
    }
  );
};

//Чому працюють тільки одинакові імена

/*
13) Додати поле стать в бд, якщо його не існує. За допомогою функції агрегації https://www.mongodb.com/docs/manual/reference/operator/aggregation/avg/ реалізувати отримання середнього зросту жінок і чоловіків

Відповідь у вигляді

[

    {

        "_id": "women",

        "avg": "170"

    },

    {

        "_id": "men",

        "avg": "178"

    }

]
*/

exports.getUsersAvg = function (req, res) {
  user.aggregate(
    [
      {
        $group: {
          _id: '$sex',
          avg: { $avg: '$height' },
        },
      },
    ],
    (err, users) => {
      if (err) res.send(err);
      res.json(users);
    }
  );
};

//як працює синтаксис find
// sort задає філтр для findOne
/*10) Показати найcтаршого користувача, використати функцію findOne(). Додати перевірку, щоб поле зріст існувало в документі */
exports.findOneOldest = (req, res) => {
  user
    .findOne(
      {
        height: { $exists: true },
      },
      (err, users) => {
        if (err) res.send(err);
        res.json(users);
      }
    )
    .sort({ age: -1 });
};

//req i res яка різниця
/*1) Видалити документи в яких порожнє АБО ім'я, АБО вік (використайте $or)*/
exports.removeEmptyNameOrAge = (req, res) => {
  user.remove(
    {
      $or: [
        { name: { $exists: false } },
        { name: '' },
        { age: { $exists: false } },
        { age: '' },
      ],
    },
    (err, users) => {
      if (err) res.send(err);
      res.status(200).json({ message: 'Successful' });
    }
  );
};

//8) Показати корстувачів ім'я яких починається з заданої користувачем літери

exports.findUserByLetter = (req, res) => {
  user.find(
    { name: { $regex: '^' + req.params.letter[0], $options: 'i' } },
    (err, users) => {
      if (err) res.send(err);
      res.status(200).json({ message: users });
    }
  );
};
