window.projectData = {
  slug: "mean-time",
  title: "MeanTime",
  source: "Mean-Time",
  category: "Solidity / CCTP / React",
  summary: "A protocol that tokenises a pending CCTP receivable so the incoming USDC can be held or traded during the attestation window.",
  facts: [["Stack", "Solidity · viem · React"], ["Chains", "Ethereum Sepolia → Arc Testnet"], ["Settlement", "CCTP attestation + ERC-721"]],
  diagram: [["Burn", "CCTP source chain"], ["Mint", "receivable NFT"], ["Trade", "list or fill"], ["Attest", "Circle API"], ["Settle", "release + burn"]],
  overview: "A source-chain burn is detected by the backend, then MeanTime.mint creates an ERC-721 receivable before Circle's attestation completes. The beneficial owner can list or fill it; settlement releases the inbound token and burns the NFT.",
  sections: [
    ["Mint", "sepoliaWatcher detects MessageSent and the backend calls MeanTime.mint with the CCTP message hash, inbound token, amount, and recipient."],
    ["Trade", "The owner can list a receivable with a reserve price and payment token. fill transfers the payment token to the seller and changes the beneficial owner."],
    ["Settle", "attestationPoller checks Circle's attestation API. Once complete, receiveMessage releases the inbound USDC and settle pays the current beneficial owner before burning the NFT."],
  ],
  sourceFiles: ["contracts/src/MeanTime.sol", "backend/src/sepoliaWatcher.ts", "backend/src/attestationPoller.ts", "frontend/src/components/Marketplace.tsx", "architecture.md"],
  sourceUrl: "https://github.com/dorianturner/Mean-Time",
  visual: {
    type: "diagram",
    widget: "mean-time",
    heading: "From CCTP burn to settlement",
    description: "The receivable exists during CCTP’s attestation window. MeanTime makes that pending delivery purchasable, then pays whoever owns the economic claim when the inbound token arrives.",
  },
};
