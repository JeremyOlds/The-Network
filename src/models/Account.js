export class Account {
  constructor(data) {
    this.id = data.id
    this.email = data.email
    this.name = data.name
    this.picture = data.picture
    this.bio = data.bio
    this.linkedin = data.linkedin
    this.github = data.github
    this.resume = data.resume
    this.coverImg = data.coverImg
    this.graduated = data.graduated
    this.class = data.class
    // TODO add additional properties if needed
  }
}
