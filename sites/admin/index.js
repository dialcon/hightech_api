'use strict';

const controllers = require('./controllers');

module.exports = (app) => {
  app.get(`/v1/hightech/users/me`, controllers.Users.me);
  app.put(`/v1/hightech/users/me`, controllers.Users.setMe);


  //endpoints gestión de usuarios
  app.get(`/v1/hightech/users/:user_id([0-9a-fA-F]{24})`, controllers.Users.get);
  app.get(`/v1/hightech/users`, controllers.Users.list);
  app.get(`/v1/hightech/users/:count(count)`, controllers.Users.list);
  app.post(`/v1/hightech/users`, controllers.Users.post);
  app.put(`/v1/hightech/users/:user_id([0-9a-fA-F]{24})`, controllers.Users.put);

  //credits cards
  // app.put(`/v1/hightech/users/:user_id([0-9a-fA-F]{24})/credits-cards/:credit_card_id([0-9a-fA-F]{24})`, controllers.CreditsCards.put);
  // app.get(`/v1/hightech/users/:user_id([0-9a-fA-F]{24})/credits-cards/:credit_card_id([0-9a-fA-F]{24})`, controllers.CreditsCards.put);
  //app.list(`/v1/hightech/users/:user_id([0-9a-fA-F]{24})/credits-cards/`, controllers.CreditsCards.list);
  app.post(`/v1/hightech/users/:user_id([0-9a-fA-F]{24})/credits-cards/`, controllers.CreditsCards.post);
  //app.delete(`/v1/hightech/credits-cards/:credit_card_id([0-9a-fA-F]{24})`, controllers.CreditsCards.delete);


};
