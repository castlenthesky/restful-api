import makeUser from './user'

export default function makeUserList({ database }) {
  return Object.freeze({
    getUsers,
    // findById,
    // findByEmail,
    // add,
    // replace,
    // update,
    // remove,
  })

  async function getUsers ({ 
    max = 100, 
    // before, 
    // after 
  }: {
    max?: number, 
    // before?: boolean, 
    // after?: boolean
  } = {}) {
    const db = await database
    const query = {}
    // if (before || after) {
    //   query._id = {}
    //   query._id = before ? { ...query.id, $lt: db.makeId(before) } : query._id
    // }
    return (await db
      .collection('users')
      .find(query)
      .limit(Number(max))
      .toArray())
  }
}
