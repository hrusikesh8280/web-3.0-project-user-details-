import Array "mo:base/Array";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Bool "mo:base/Bool";


actor UserActor {
    type User = {
        id:Nat;
        name: Text;
        age: Nat;
        address: Text;
        image: Text;
    };

    type NewUser = {
        name: Text;
        age: Nat;
        address: Text;
        image: Text;
    };
   stable var users : [User] = [];

public func addUser(user:NewUser):async (){
  let newId = Array.size(users);
  let updateUser:User = {
    id=newId;
    name=user.name;
    age = user.age ;
    address = user.address ;
    image = user.image ;
  };
  let newUser = Array.tabulate<User>(Array.size(users)+1,func(i:Nat){
    if(i < Array.size(users)){
      return users[i];
    }else{
      return updateUser;
    }
  });
  users := newUser;
};
public query func getUser():async[User]{
  return users;
};

public func findByUserName(searchName:Text): async ?User{
  return Array.find<User>(users,func(user:User):Bool{
    return user.name == searchName;
  });
};

public func deleteUser(targetId:Nat): async(){
  users := Array.filter<User>(users,func(user:User):Bool{
    return user.id != targetId;
  });
};

public func updateUserById(targetId: Nat, updatedUser: User): async () {
    users := Array.tabulate<User>(Array.size(users), func(i: Nat): User {
        let currentUser = users[i];
        if (currentUser.id == targetId) {
            return {
                id = targetId; 
                name = updatedUser.name;
                age = updatedUser.age;
                address = updatedUser.address;
                image = updatedUser.image;
            };
        } else {
            return currentUser;
        }
    });
}

}
