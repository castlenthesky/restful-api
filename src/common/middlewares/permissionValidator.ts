import * as crypto from 'crypto'
import User from '../../services/users/model'

export async function hasCredentials (req, res, next) {
  let errors = []

  if (req.body) {
    if (!req.body.username) {
      errors.push('Missing username field.')
    }
    if (!req.body.password) {
      errors.push('Missing password field.')
    }

    if (errors.length) {
      return res.status(400).send({ errors: errors.join(',')})
    } else {
      return next()
    }
  } else {
    return res.status(400).send({errors: 'Missing username and password fields.'})
  }
}

export async function validCredentials (req, res, next) {
  // Locate the presented user in the database.
  User.find({username: req.body.username}, (err, results) => {
    if (!results || err) {
      // If the user does not exist, or there was an error locating them, return the error.
      res.status(403).send({errors: ['username or password were invalid', err]})
    } else {
      // Extract the located user from the results set.
      const locatedUser = results[0].toJSON()
      // Split the salt, and stored hash for the located user.
      let [salt, storedHash] = locatedUser.password.split('$')

      // Hash the presented password with the stored hash.
      let submittedHashed = crypto.createHmac('sha512', salt).update(req.body.password).digest('base64')
      
      // If the submitted hash matches the stored hash in the database, 
      // add the validated user's data to the request body.
      if (submittedHashed === storedHash) {
        req.body = {
          userID: locatedUser._id,
          permission_level: locatedUser.permission_level,
          username: locatedUser.username,
          name_first: locatedUser.name_first,
          name_last: locatedUser.name_last,
          role: locatedUser.role,
          title: locatedUser.title,
          email: locatedUser.email,
        }
        return next()
      } else {
        return res.status(401).send('Invalid username or password.')
      }
    }
  })
}
