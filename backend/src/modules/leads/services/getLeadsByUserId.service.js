import Lead from "../../../DB/models/Lead.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const getLeadsByUserId = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const { search } = req.query;

  // Step 1: Get all leads for this user
  const allLeads = await Lead.find({
    $or: [
      { createdBy: userId },
      { assignedTo: userId }
    ]
  });

  // Step 2: Filter in memory (if search exists)
  let filteredLeads = allLeads;
  if (search) {
    const value = search.toLowerCase();
    filteredLeads = allLeads.filter(lead =>
      lead.name?.toLowerCase().includes(value) ||
      lead.company?.toLowerCase().includes(value) ||
      lead.email?.toLowerCase().includes(value) ||
      lead.phone?.toLowerCase().includes(value) ||
      lead.status?.toLowerCase().includes(value) ||
      lead.source?.toLowerCase().includes(value)
    );
  }

  // Step 3: Return response
  return res.status(200).json({
    status: "success",
    message: "Leads retrieved successfully",
    leads: filteredLeads
  });
});

export default getLeadsByUserId;