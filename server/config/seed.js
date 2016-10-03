/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';
import Book from '../api/book/book.model';
import Movie from '../api/movie/movie.model';
import Contact from '../api/contact/contact.model';
import Task from '../api/task/task.model';

User.find(function (err, data) {
  if(data.length < 1){
    User.removeAsync()
    .then(() => {
      User.createAsync({
        provider: 'local',
        name: 'Test User',
        email: 'user@codenx.com',
        password: 'codenx'
      }, {
        provider: 'local',
        role: 'admin',
        name: 'Admin',
        email: 'admin@codenx.com',
        password: 'codenx'
      })
      .then(() => {
        console.log('finished populating users');
      });
    });
  }
});

Movie.find(function (err, data) {
  if(data.length < 1){
    Movie.removeAsync()
    .then(() => {
      Movie.createAsync({ name: 'The Martian', production: 'Ridley Scott', rating:'8.1', genre: 'Thriller', language: 'English', releaseDate: '2015-10-02' },
      { name: 'Star Wars : The Force Awakens', production: 'J.J Abrams', rating:'8.5', genre: 'Action', language: 'English', releaseDate: '2015-12-18' },
      { name: 'Prem Ratan Dhan Payo', production: 'Sooraj Barjatya', rating:'5', genre: 'Drama', language: 'Hindi', releaseDate: '2015-11-12' },
      { name: 'Mission:Impossible - Rouge Nation', production: 'Christopher McQuarrie', rating:'7.5', genre: 'Action', language: 'English', releaseDate: '2015-07-31' },
      { name: 'Mad Max:Fury road', production: 'Geroge Miler', rating:'8.2', genre: 'Thriller', language: 'English', releaseDate: '2015-05-15' },
      { name: 'Jurassic World', production: 'Colin Trevorrow', rating:'7.1', genre: 'SiFi', language: 'English', releaseDate: '2015-06-12' },
      { name: 'Inside Out', production: 'Pixar . Walt Disney Pictures', rating:'8.3', genre: 'Comedy', language: 'English', releaseDate: '2015-06-19' },
      { name: 'Furious 7', production: 'James Wan', rating:'7.3', genre: 'Thriller', language: 'English', releaseDate: '2015-04-03' },
      { name: 'Dilwale', production: 'Rohit Shetty', rating:'5.6', genre: 'Romance', language: 'Hindi', releaseDate: '2015-12-18' },
      { name: 'Bajirao Mastani', production: 'Sanjaya leela Bhansali', rating:'7.2', genre: 'Romance', language: 'English', releaseDate: '2015-12-18' },
      { name: 'Avengers : Age of Ultron', production: 'Joss whedon', rating:'7.6', genre: 'Action', language: 'English', releaseDate: '2015-05-01' })
      .then(() => {
        console.log('finished populating movies');
      });
    });
  }
});

Contact.find(function (err, data) {
  if(data.length < 1){
    Contact.removeAsync()
    .then(() => {
      Contact.createAsync({ name: 'PAYTM', email: 'info@paytm.com', phone:'0120 306 2244', category: 'Shopping'},
      { name: 'OLX', email: 'customer@olx.in', phone:'1800 103 3333', category: 'Shopping'},
      { name: 'Ipsita Sahoo', email: 'admin@codenx.com', phone:'9999 999 9999', category: 'Family'},
      { name: 'Amazon India', email: 'cs@amazon.in', phone:'1800 300 9009', category: 'Shopping'})
      .then(() => {
        console.log('finished populating contacts');
      });
    });
  }
});

Task.find(function (err, data) {
  if(data.length < 1){
  Task.removeAsync()
    .then(() => {
      Task.createAsync({ name: 'Submit product for review', category:'Promotions'},
      { name: 'Submit for review', category:'Developments'},
      { name: 'Recharge Dish TV', category:'Shopping'},
      { name: 'Purchase a new laptop', category:'Shopping'},
      { name: 'Complete Documentation', category:'Developments'},
      { name: 'Check website SEO', category:'SEO'},
      { name: 'Buy some milk', category:'Shopping'},
      { name: 'Book air tickets', category:'Shopping'})
      .then(() => {
        console.log('finished populating tasks');
      });
    });
  }
});

Book.find(function (err, data) {
  if(data.length < 1){
    Book.removeAsync()
      .then(() => {
      Book.createAsync({name: 'What young India wants', author: 'Chetan Bhagat', category: 'Non fiction', price: '87', releaseDate: '2012-08-06', isbn: '812913554X;978-8129135544' },
      {name: 'Two States', author: 'Chetan Bhagat', category: 'Novel', price: '89', releaseDate: '2014-04-18', isbn: '8129135523;978-8129135520' },
      {name: 'The hunger games', author: 'Suzanne Collions', category: 'Novel', price: '279', releaseDate: '2013-11-12', isbn: '9781407157863' },
      {name: 'The 3 mistakes of my life', author: '	Chetan Bhagat', category: 'Novel', price: '77', releaseDate: '2008-05-26', isbn:'8129135515;978-8129135513' },
      {name: 'Serious Men', author: '	Manu Joseph', category: 'Novel', price: '280', releaseDate: '2010-08-01.', isbn: '978-0393338591' },
      {name: 'Revolution 2020', author: '	Chetan Bhagat', category: 'Novel', price: '170', releaseDate: '2011-09-01', isbn: '8129118807' },
      {name: 'God"s Little Soldier', author: 'Kiran Nagarkar', category: 'Story', price: '499', releaseDate: '2006-04-06', isbn: '9789350292181' })
      .then(() => {
        console.log('finished populating books');
      });
    });
  }
});
