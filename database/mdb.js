module.exports = mongoPool => {
  return {
    getCount(user, countsField) {
      return mongoPool
        .collection('users')
        .findOne({ userId: user.id })
        .then(userCounts => userCounts[countsField])
    }
  }
}
