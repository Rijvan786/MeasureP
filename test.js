
 const New=/^(?=.*\d)(?=.*[@$!%*?&()]).{8,}$/

 const isValid=New.test("Rijvan(123)")

 console.log(isValid);
