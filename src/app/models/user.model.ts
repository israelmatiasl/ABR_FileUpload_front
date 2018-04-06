export class User {
    constructor(
      public name:string,
      public document:string,
      public image?:string,
      public created_at?:Date,
      public updated_at?:Date,
      public _id?:string
    ) { }
  }