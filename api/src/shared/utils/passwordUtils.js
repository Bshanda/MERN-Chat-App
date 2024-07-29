import crypto from 'crypto'
import EnvVars from '../../constants/EnvVars.js'

export const generateHash = (password) => {
	const salt = EnvVars.MySalt

	return crypto.pbkdf2Sync(password, salt, 10, 32, 'sha512').toString('hex')
}

export const verifyPassword = (password, hash) => {
	const salt = EnvVars.MySalt
	const verifyHash = crypto.pbkdf2Sync(password, salt, 10, 32, 'sha512').toString('hex')

	const passwordVerified = hash == verifyHash ? true : false

	if (!passwordVerified) {
		// console.log('Wrong password')
		return false
	}

	// console.log('Password matched')
	return true
}
