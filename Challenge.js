import {
    Principal,
    Context,
    HttpAgent,
    IDL,
    Nat,
    Record,
    Text,
    Vec,
  } from "@dfinity/agent";
  
  const canisterIDL = IDL.Service({
    // Define methods for communication, challenge reporting, reviews, and donations
    sendMessage: IDL.Func([Text], [], []),
    reportChallenge: IDL.Func([Text], [], []),
    getChallenges: IDL.Func([], [Vec(Text)], ["query"]),
    leaveReview: IDL.Func([Text], [], []),
    getReviews: IDL.Func([], [Vec(Text)], ["query"]),
    donate: IDL.Func([Nat], [], []),
    getDonations: IDL.Func([], [Nat], ["query"]),
  });
  
  const agent = new HttpAgent();
  const canisterId = "<YOUR_CANISTER_ID>"; // Replace with the actual canister ID
  
  const myCanister = IDL.createActor(canisterIDL, { agent, canisterId });
  
  // Function to send a message to local authorities
  async function sendMessage(message: string): Promise<void> {
    try {
      await myCanister.sendMessage(message);
      console.log("Message sent successfully!");
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  }
  
  // Function to report a challenge to local authorities
  async function reportChallenge(challenge: string): Promise<void> {
    try {
      await myCanister.reportChallenge(challenge);
      console.log("Challenge reported successfully!");
    } catch (error) {
      console.error("Error reporting challenge:", error);
      throw error;
    }
  }
  
  // Function to get all reported challenges
  async function getChallenges(): Promise<string[]> {
    try {
      const challenges = await myCanister.getChallenges();
      console.log("Challenges:", challenges);
      return challenges;
    } catch (error) {
      console.error("Error getting challenges:", error);
      throw error;
    }
  }
  
  // Function to leave a review for local authorities
  async function leaveReview(review: string): Promise<void> {
    try {
      await myCanister.leaveReview(review);
      console.log("Review left successfully!");
    } catch (error) {
      console.error("Error leaving review:", error);
      throw error;
    }
  }
  
  // Function to get all reviews
  async function getReviews(): Promise<string[]> {
    try {
      const reviews = await myCanister.getReviews();
      console.log("Reviews:", reviews);
      return reviews;
    } catch (error) {
      console.error("Error getting reviews:", error);
      throw error;
    }
  }
  
  // Function to donate to local authorities
  async function donate(amount: number): Promise<void> {
    try {
      await myCanister.donate(Nat.from(amount));
      console.log("Donation made successfully!");
    } catch (error) {
      console.error("Error making donation:", error);
      throw error;
    }
  }
  
  // Function to get total donations
  async function getDonations(): Promise<number> {
    try {
      const donations = await myCanister.getDonations();
      console.log("Total Donations:", donations);
      return Nat.unwrap(donations);
    } catch (error) {
      console.error("Error getting donations:", error);
      throw error;
    }
  }
  
  // Example usage
  sendMessage("Hello, authorities!");
  reportChallenge("Water shortage in my area.");
  leaveReview("Great service!");
  donate(100);
  getChallenges();
  getReviews();
  getDonations();
