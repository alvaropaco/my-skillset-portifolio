const chai = require("chai");
const chaiHttp = require("chai-http");
const {createService} = require("./app");
const {expect} = chai;
chai.use(chaiHttp);
chai.config.truncateThreshold = 0;

describe("Candidate Tests", () => {
  let app;
  
  beforeEach( async () => {
    const service = await createService()
    app = service.listen(9996);
  });
  afterEach(() => {
    app.close();
  });
  
  it('should return a list of words starting with "aar"', async () => {
    /*
     This file is for your testing purposes and
     will not be part of your final submission.
     */
    const req = "/";
    const stem = "aar";
    const res = await chai.request(app)
                          .get(req)
                          .query({stem: stem})
    ;
    expect(res.status).to.equal(200);
    expect(res).to.be.json;
    expect(res.body, "response.body").to.be.a("object");
    expect(res.body.data, "response.body.data").to.be.a("array");
    expect(res.body.data.length, "response.body.data.length").to.equal(370101);
  });
  
  it('should return a list of words starting with "zebr"', async () => {
    /*
     This file is for your testing purposes and
     will not be part of your final submission.
     */
    const req = "/";
    const stem = "zebra";
    const res = await chai.request(app)
                          .get(req)
                          .query({stem: stem})
    ;

    const expected = {
      "data": [ 'zebra', 'zebrafishes', 'zebralike', 'zebrass', 'zebrawood', 'zebrine', 'zebrinny', 'zebrula' ]
    };
    expect(res.status).to.equal(204);
  });
});