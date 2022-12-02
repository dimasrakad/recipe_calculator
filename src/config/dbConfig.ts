import { connect } from "mongoose";

export const dbConfig = async ()=>{ return await connect('mongodb://localhost:27017/test')};

