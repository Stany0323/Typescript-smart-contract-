import { HttpAgent } from "@dfinity/agent";

// Replace <YOUR_CANISTER_ID> with the actual canister ID
const canisterId = "<YOUR_CANISTER_ID>";

const agent = new HttpAgent();
const myCanister = agent.createActor(canisterId, {
  sendMessage: async (message: string) => {
    const response = await myCanister.sendMessage(message);
    return `Sending message: ${message}, Response: ${response}`;
  },
  reportChallenge: async (challenge: string) => {
    const response = await myCanister.reportChallenge(challenge);
    return `Reporting challenge: ${challenge}, Response: ${response}`;
  },
  getChallenges: async () => {
    const challenges = await myCanister.getChallenges();
    return `Retrieving challenges, Challenges: ${challenges}`;
  },
  leaveReview: async (review: string) => {
    const response = await myCanister.leaveReview(review);
    return `Leaving review: ${review}, Response: ${response}`;
  },
  getReviews: async () => {
    const reviews = await myCanister.getReviews();
    return `Retrieving reviews, Reviews: ${reviews}`;
  },
  donate: async (amount: number) => {
    const response = await myCanister.donate(amount);
    return `Making a donation of ${amount}, Response: ${response}`;
  },
  getDonations: async () => {
    const donations = await myCanister.getDonations();
    return `Retrieving donations, Total donations: ${donations}`;
  },
});

async function main() {
  console.log(await myCanister.sendMessage("Hello, authorities!"));
  console.log(await myCanister.reportChallenge("Challenge 1"));
  console.log(await myCanister.leaveReview("Great job!"));
  console.log(await myCanister.donate(100));

  console.log(await myCanister.getChallenges());
  console.log(await myCanister.getReviews());
  console.log(await myCanister.getDonations());
}

main().catch((err) => console.error(err));
