const CreateFundraiser = () => {
  return (
    <div>
      <p className="font-semibold text-xl py-8">Create Campaign</p>
      <form className="flex flex-col gap-4 transition-all">
        <input
          className=" p-4 border border-muted rounded-md bg-transparent"
          type="number"
          step={0.01}
          min={0.01}
          name="title"
          placeholder="Title"
          required
        />

        <input
          className=" p-4 border border-muted rounded-md bg-transparent"
          type="number"
          step={0.01}
          min={0.01}
          name="amount"
          placeholder="Amount (ETH)"
          required
        />

        <input
          className=" p-4 border border-muted rounded-md bg-transparent"
          type="date"
          name="date"
          placeholder="Expires"
          required
        />

        <input
          className=" p-4 border border-muted rounded-md bg-transparent"
          type="url"
          name="imageURL"
          placeholder="Image URL"
          required
        />

        <textarea
          className="p-4 border border-muted rounded-md bg-transparent"
          name="description"
          placeholder="Description"
          required
        ></textarea>

        <button
          type="submit"
          className=" p-4 rounded-md bg-secondary hover:bg-transparent border border-muted"
        >
          Add Campaign
        </button>
      </form>
    </div>
  );
};

export default CreateFundraiser;
