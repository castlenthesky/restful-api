import * as shortid from "short-id";

export class Todo {
  public _id: string = shortid.generate();
  public description: string = "do something";
  public author: string = "unknown";
  constructor(todoData: { description: string; author?: string }) {
    this.description = todoData.description;
    this.author = todoData.author;
  }
}
