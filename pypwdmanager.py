import os.path

def checkExistance():
    if os.path.exists("info.txt"):
        pass
    else:
        file = open("info.txt", 'w')
        file.close()

def appendNew():
    file = open("info.txt", 'a')

    print()
    print()

    userName = input("Enter the user name: ")
    password = input("Enter the password: ")
    website = input("Enter the website url: ")

    print()
    print()

    usrnm = "UserName: " + userName + "\n"
    pwd = "Password: " + password + "\n"
    web = "Website: " + website + "\n"

    file.write("------------------------\n")
    file.write(usrnm)
    file.write(pwd)
    file.write(web)
    file.write("------------------------\n")
    file.write("\n")
    file.close

    def readPasswords():
        file = open("info.txt", 'r')
        content = file.read()
        file.close()
        print(content)
