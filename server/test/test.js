

var supertest=require("supertest");
var should=require("should");

var server=supertest.agent("http://localhost:3001");

const assert=require("assert");


describe('UserProfile', function(){
 
    
    it('should return Successfull',(done)=>{
        server.post("/userProfile")
        .send({name:"Shiyon Kurian"})
        .then(function(res){
            assert.strictEqual(res.status,200);
            done();
        })
        .catch(done);

    });

 
}
);

