// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SmartContract{
    
    uint public userCount=0;
    uint public certificateCount=0;

    mapping(string => user) public usersList;
    mapping(string => certificate) public certificateList;

     struct user{
      string username;
      string email;
      string password;
  }

    struct certificate{
      string username;
      string rollNumber;
      string course;
      string college;
      string date;
      string specialization;
      string issuedBy;
  }

  function createUser(string memory _username,string memory _email,string memory _password ) public {
        userCount++;
        usersList[_email] = user(_username,_email,_password);
    }

  function createCertificate(string memory _username,string memory _rollNumber,string memory _course ,string memory _college , string memory _date ,string  memory _specialization,string memory _issuedBy ) public {
        certificateCount++;
        certificateList[_rollNumber] = certificate(_username,_rollNumber,_course,_college,_date,_specialization,_issuedBy);
    }

     
}