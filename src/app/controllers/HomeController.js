import path from 'path';
import { static } from 'express';

class HomeController {
  index(req, res) {
    return res.sendFile('home.html', {
      root: path.join(__dirname, '..', '..', '..', 'public/'),
    });
  }

  documentation(req, res) {
    return res.sendFile('api.html', {
      root: path.join(__dirname, '..', '..', '..', 'public/'),
    });
  }
}

export default new HomeController();
