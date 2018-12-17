import PouchDB from 'pouchdb'

export let createDB = () => {
  let db = new PouchDB('users')
  // let user_id:number=new Date().getTime();
  var doc = {
    _id: 'user_id',
    name: 'cc',
    age: 24,
    hobbies: [
      'playing with balls of yarn',
      'chasing laser pointers',
      'lookin hella cute'
    ]
  }
  db.put(doc)
  //获取 db 信息
  db.info().then(info => {
    console.log(info)
  })
  //获取_id 的值
  db.get('user_id').then(doc => {
    console.log(doc)
  })
  //更新 doc
  // doc.age+=4; (doc as any)._rev='1-9ea407799612c4a222f811f5d6fc5fd5'
  // db.put(doc);

  //获取_id 的值
  db.get('user_id')
    .then(doc => {
      ;(doc as any).age += 4
      return db.put(doc)
    })
    .then(() => {
      return db.get('user_id')
    })
    .then(doc => {
      console.log('new', doc)
    })
}
