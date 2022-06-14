// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract ContestFactory {
    struct deployedContest {
        string name;
        string description;
        address atAddress;
    }

    deployedContest[] public deployedContests;
    
    function createContest(string memory _name, string memory _desc, uint noOfCandidates) public payable {
        address _atAddress = address( (new Contest){value : msg.value}(_name, _desc, noOfCandidates, msg.sender) );

        deployedContest memory newContest = deployedContest({
           name: _name,
           description: _desc,
           atAddress: _atAddress
        });

        deployedContests.push(newContest);
    }
    
    function getDeployedContests() public view returns(deployedContest[] memory){
        return deployedContests;
    }
}

contract Contest {
    struct Candidate {
        string name;
        string description;
        address payable recipient;
        uint index;
        uint voteCount;
        // mapping(address => bool) CandidateVoters;
    }

    Candidate[] public candidates;
    mapping(address => bool) public voters;

    address public manager;
    uint public votersCount;
    
    string public name;
    string public desc;
    uint public noOfCandidates;
    uint public prizeAmount;
    bool public completed;
    bool public active;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    constructor(string memory _name, string memory _desc, uint _noOfCandidates, address creator) payable {
        name = _name;
        desc = _desc;
        manager = creator;
        prizeAmount = msg.value;
        noOfCandidates = _noOfCandidates;
        completed = false;
        active = false;
        votersCount = 0;
    }

    function createCandidate(string memory _name, string memory _description, address payable _recipient) public restricted {
        Candidate memory newCandidate = Candidate({
           name: _name,
           description: _description,
           recipient: _recipient,
           index: candidates.length,
           voteCount: 0
        });

        candidates.push(newCandidate);
    }

    function getCandidates() public view returns(Candidate[] memory){
        return candidates;
    }

    function vote(uint index) public {
        require(active);
        require(!completed);
        require(!voters[msg.sender]);

        Candidate storage candidate = candidates[index];
        candidate.voteCount++;

        voters[msg.sender] = true;
        votersCount++;
        // candidate.CandidateVoters[msg.sender] = true;
    }

    function finalizeRequest() public restricted {
        uint index = 0;
        uint maxVote = 0;

        for (uint i=0; i<candidates.length; i++) {
            if(candidates[i].voteCount > maxVote){
                maxVote = candidates[i].voteCount;
                index = i;
            }
        }

        Candidate storage candidate = candidates[index];
        candidate.recipient.transfer(prizeAmount);

        active = false;
        completed = true;
    }

    function activateContest() public restricted {
        active = true;
    }

    function getSummary() public view returns (
      uint, uint, uint, address, uint256
      ) {
        return (
          noOfCandidates,
          prizeAmount,
          votersCount,
          manager,
          address(this).balance
        );
    }
}