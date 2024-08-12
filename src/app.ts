function div(a:number, b:number){
    return a/b;
}
div(5, 6);
div(9,0);

//@ts-check
//@ts-expect-error
//@ts-nocheck
div('a','b');

interface User {
    name: string;
    id: number;
  }
   
  class UserAccount {
    name: string;
    id: number;
   
    constructor(name: string, id: number) {
      this.name = name;
      this.id = id;
    }
  }
   
  const user: User = new UserAccount("Murphy", 1);

  function deleteUser(user: User) {
    user.id = 0;
    user.name = '';
  }
   
  function getAdminUser(): User {
    const admin:User={id:2, name:"Admin"};
    return admin;
  }

  type WindowStates = "open" | "closed" | "minimized";
type LockStates = "locked" | "unlocked";
type PositiveOddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;

function getLength(obj: string | string[]) {
    return obj.length;
  }

  function wrapInArray(obj: string | string[]) {
    if (typeof obj === "string") {
      return [obj];
              
  (parameter) obj: string
    }
    return obj;
  }

  type StringArray = Array<string>;
type NumberArray = Array<number>;
type ObjectWithNameArray = Array<{ name: string }>;

interface Backpack<Type> {
    add: (obj: Type) => void;
    get: () => Type;
  }
   
  // This line is a shortcut to tell TypeScript there is a
  // constant called `backpack`, and to not worry about where it came from.
  declare const backpack: Backpack<string>;
   
  // object is a string, because we declared it above as the variable part of Backpack.
  const object = backpack.get();
   
  // Since the backpack variable is a string, you can't pass a number to the add function.
  backpack.add(23);