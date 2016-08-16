var express = require('express');
var router = express.Router();

router.get('/content', function(req, res, next) {
    res.render('content', { title: 'ehehe'});
});
router.get('/layouts', layouts);

router.get('/masterpage', function(req, res, next) {
    console.log('pagina masterpage chamada');
    res.render('masterpage', {
        head: {
              title: 'page title'
        },
        content: {
              title: 'ALUGUEL DE IMOVEIS',
              description: 'description'
        }
    });
});

function layouts(req, res, next) {
     res.render('layout7', {
     });
}

exports.findAll = function(req, res) {
    var mongodb = require('mongodb');
    var MongoClient = mongodb.MongoClient;
    var url = 'mongodb://localhost:27017/netimoveis';
    MongoClient.connect(url, function (err, db) {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
        return;
      } else {
        console.log('Connection established to', url);
        var collectionUsers = db.collection('users');
        //console.log(collectionUsers);
        //db.collection.find({})
        var filterRowStatus = { roles: 'user' };
        var sort = { name: -1 };
        collectionUsers.find(filterRowStatus).sort(sort).toArray(function(err, items) {
            console.log(items);
            res.render('master', {
                head: {
                    title: 'Your title here'
                },
                homepage: {
                    title: 'home sweet home',
                    items: items
                }
            });
        });
        db.close();
    }
  });
};
router.get('/',  exports.findAll);

module.exports = router;
