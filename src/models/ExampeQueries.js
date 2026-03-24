async function exampleQueries() {
  const tenantId = new Types.ObjectId();

  const user = await User.create({
    name: "John",
    surname: "Doe",
    email: "john@crm.com",
    passwordHash: "hashed",
    role: "admin",
    status: "active",
    tenantId,
  });

  const company = await Company.create({
    name: "Acme Inc",
    address: "Street 1",
    city: "City",
    postCode: "00-000",
    email: "contact@acme.com",
    phone: "123456789",
    status: "active",
    type: "lead",
    contactMethods: ["email", "phone"],
    brokerId: user._id,
    tenantId,
  });

  const contact = await Contact.create({
    companyId: company._id,
    name: "Jane",
    surname: "Smith",
    position: "CEO",
    email: "jane@acme.com",
    phone: "987654321",
    tags: ["vip"],
    tenantId,
  });

  const pipeline = await Pipeline.create({
    companyId: company._id,
    name: "Deal 1",
    value: 10000,
    stage: "prospecting",
    status: "active",
    progress: [{ stage: "prospecting", date: new Date() }],
    closingDate: new Date(),
    tenantId,
  });

  const companiesWithBroker = await Company.find({ tenantId }).populate(
    "brokerId",
  );

  const companyContacts = await Contact.find({
    companyId: company._id,
    tenantId,
  });

  const pipelines = await Pipeline.find({ tenantId, status: "active" });

  const pipelineWithCompany = await Pipeline.findById(pipeline._id).populate(
    "companyId",
  );

  const aggregation = await Pipeline.aggregate([
    { $match: { tenantId } },
    { $group: { _id: "$status", total: { $sum: "$value" } } },
  ]);

  return {
    user,
    company,
    contact,
    pipeline,
    companiesWithBroker,
    companyContacts,
    pipelines,
    pipelineWithCompany,
    aggregation,
  };
}

module.exports = { exampleQueries };
