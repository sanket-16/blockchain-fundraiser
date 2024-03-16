// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract FundMe {
  struct Donation {
    string id;
    address donator;
    uint256 amount;
    uint createdAt;
    string  message;
  }

  struct Campaign {
    string  id;
    address owner;
    string title;
    string description;
    string category;
    string[] images;
    uint256 target;
    uint deadline;
    uint createdAt;
    uint amountCollected;
    Donation[] donations;
  }

    mapping(uint => Campaign) public campaigns;

    uint256 public numberOfCampaigns = 0;

   function createCampaign(string memory _id, address _owner, string memory _title, string memory _description, string memory _category, string[] memory _images, uint256 _target, uint _deadline) public returns (uint256) {
    require(_deadline > block.timestamp, "The deadline should be a date in the future.");

    Campaign storage campaign = campaigns[numberOfCampaigns];
    campaign.id = _id;
    campaign.owner = _owner;
    campaign.title = _title;
    campaign.description = _description;
    campaign.category = _category;
    campaign.images = _images;
    campaign.target =  _target;
    campaign.createdAt = block.timestamp;
    campaign.deadline = _deadline;
    campaign.amountCollected = 0;


    numberOfCampaigns++;

    return numberOfCampaigns - 1;
}

   function donateToCampaign(string memory _id, string memory _message) public payable {

        Donation memory donation;
        donation.id = _id;
        donation.amount = msg.value;
        donation.donator = msg.sender;
        donation.message = _message;
        donation.createdAt = block.timestamp;
        
         for (uint i = 0; i < numberOfCampaigns; i++) {
            string memory check = campaigns[i].id;
            if (keccak256(abi.encodePacked(check)) == keccak256(abi.encodePacked(_id))) {
                Campaign storage result = campaigns[i];
                (bool sent, ) = payable(result.owner).call{value: msg.value}("");
                
                require(sent, "Failed to send funds");
                
                result.donations.push(donation);

                result.amountCollected = result.amountCollected + msg.value;
            }
        }

       


}

    function getDonations(uint256 _id) view public returns (Donation[] memory){
        return (campaigns[_id].donations);
    }

    function getCampaigns() public view returns (Campaign[] memory){
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for(uint i = 0; i <numberOfCampaigns; i++){
            Campaign storage item = campaigns[i];
            allCampaigns[i] = item;
        }

        return allCampaigns;
    }

    function getCampaign(string memory _id) public view returns (Campaign memory) {
        for (uint i = 0; i < numberOfCampaigns; i++) {
            string memory check = campaigns[i].id;
            if (keccak256(abi.encodePacked(check)) == keccak256(abi.encodePacked(_id))) {
                Campaign storage result = campaigns[i];
                return result;
            }
        }

        return Campaign("", address(0), "", "", "", new string[](0), 0 ,0 , 0, 0, new Donation[](0));
    }

   function getUserCampaigns(address _address) public view returns (Campaign[] memory) {
        uint count = 0;

        for (uint i = 0; i < numberOfCampaigns; i++) {
            address check = campaigns[i].owner;
            if (check == _address) {
                count++;
            }
        }

        Campaign[] memory userCampaigns = new Campaign[](count);

        uint index = 0;
        for (uint i = 0; i < numberOfCampaigns; i++) {
            address check = campaigns[i].owner;
            if (check == _address) {
                userCampaigns[index] = campaigns[i];
                index++;
            }
        }

        return userCampaigns;
    }

    function getDonationsByDonator(address donatorAddress) public view returns (Donation[] memory) {
        uint totalDonations = 0;

        for (uint i = 0; i < numberOfCampaigns; i++) {
            totalDonations += campaigns[i].donations.length;
        }

        Donation[] memory donationsByDonator = new Donation[](totalDonations);

        uint index = 0;
        for (uint i = 0; i < numberOfCampaigns; i++) {
            for (uint j = 0; j < campaigns[i].donations.length; j++) {
                if (campaigns[i].donations[j].donator == donatorAddress) {
                    donationsByDonator[index] = campaigns[i].donations[j];
                    index++;
                }
            }
        }

        return donationsByDonator;
    }

}