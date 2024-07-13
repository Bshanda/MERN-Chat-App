export const saveToLocalStorage = ({ key, value }) => {
  // check for unvalid keys
  if (typeof key != 'string') {
    console.log(
      'Save to local storage failed. Reason :- key is not a string:-',
      key
    )
    return
  }

  // console.log('Key:-', key)
  // console.log('typeOF value:-',typeof value)
  try {
    //As the 'auth' value is sent as a string. donot stringify if key is 'auth'.
    if (key != 'auth') {
      // console.log('Key was not auth',key);
     let stringifiedValue = JSON.stringify(value)
      // console.log('stringified Value:-',stringifiedValue);
      localStorage.setItem(key, stringifiedValue)
      return
    }
    // console.log('Key was auth',key);
    localStorage.setItem(key, value)
  } catch (error) {
    console.log('Error in setting Local storage',error)
  }
}

export const getFromLocalStorage = key => {
  // check for unvalid keys
  if (typeof key != 'string') {
    console.log('Get from local storage failed. Reason :- key is not a string')
    return
  }
  try {
    //As the 'auth' value is sent as a string from backend. donot stringify if key is 'auth'.
    if (key != 'auth') return JSON.parse(localStorage.getItem(key))
    // Return value without parsing if key is not "auth"
    return localStorage.getItem(key)
  } catch (error) {
    console.log('Error in getting value from local storage')
  }
}

export const removeFromLocalStorage = key => {
  // check for unvalid keys
  if (typeof key != 'string') {
    console.log('Get from local storage failed. Reason :- key is not a string')
    return
  }
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.log('Error in removing key:-', error)
  }
}
