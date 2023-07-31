
import mongoose from 'mongoose'
const Connection=(username,password)=>{
mongoose.connect(`mongodb://${username}:${password}@ac-pwsvmxn-shard-00-00.ilb4spu.mongodb.net:27017,ac-pwsvmxn-shard-00-01.ilb4spu.mongodb.net:27017,ac-pwsvmxn-shard-00-02.ilb4spu.mongodb.net:27017/?ssl=true&replicaSet=atlas-7hbbgd-shard-0&authSource=admin&retryWrites=true&w=majority`
,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", ()=> {
  console.log("Connected successfully ");
});

}
export default Connection;