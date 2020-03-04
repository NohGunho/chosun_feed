const stream =require("getstream");

module.exports = {

  async store(req,res) {
    var client = stream.connect('p5mv3rqjj4u6','qbanwcyuyvts8s48vtbhphc645zbv7fzudvdp6wvjxjbd77msunquxf2z7hzw2te','70719');
    let token = client.getReadOnlyToken(
        `${req.params.feedName}`,
        `${req.params.id}`
        );
    return res.json(token);
  }

};