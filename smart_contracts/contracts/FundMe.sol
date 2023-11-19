// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;


contract FundMe {
    struct Campaign {
        string id;
        address author;
        Transaction[] transactions;
    }
    struct Transaction {
        address from;
        address to;
    }

    function createCampaign(string memory _id,address _author) public {
        Transaction[] memory transactions;
        Campaign memory newCampaign =  Campaign({
            author:_author,
            id:_id,
            transactions: transactions
        });
         campaigns[_author].push(newCampaign);
    }

    // function donate(uint _amount) public payable {
    //     require(msg.sender.balance<_amount,"You do not have enough balance.");
        
    // }

    mapping(address => Campaign[] ) public campaigns;

}