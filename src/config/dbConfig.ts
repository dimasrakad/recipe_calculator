import { connect } from "mongoose";

export const dbConfig = async ()=>{ return await connect('mongodb://127.0.0.1/test')}; // Astrid
// export const dbConfig = async ()=>{ return await connect('mongodb://localhost:27017/test')};

