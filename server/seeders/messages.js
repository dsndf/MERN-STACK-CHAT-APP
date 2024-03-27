import { faker } from "@faker-js/faker";

export const createAttachments = (numofAttachments)=>{
let attachments = [];
for(let i=0; i<numofAttachments; i++){
attachments.push({
 public_id:faker.system.fileName(),
 url:i==2?faker.music.genre():faker.image.url()
})

}
return attachments;
}