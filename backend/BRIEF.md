# Brief

## Build CRM using modern tech stack

- Runtime: node.js
- Framework: Express.js
- Database: MongoDB
- ODM (Object Data Modeling): Moongoose
- Auth / Users / Roles: JSON Web Token
- Password hashing: bcrypt

## Structure

Here's proposed structure of the database Schemas & relations

### Common fields for al Schemas

- id / guid [GUID]
- Date created [ISO date]
- Date edited [ISO date]
- Date deleted [ISO date]

### Users

- Name [String, required]
- Surname [String, required]
- Email [String, required]
- Groups [Groups Schema, required]
- Last login [ISO date, optional]
- Status [User Status Schema, required]

### Groups

- Name [String, required]
- GroupID [Number, required]

Groups can be: Admin, User, Editor

### User Status

- Name [String, required]
- UserStatusID [Number, required]

Status can be: Active, Inactive, Cancelled, Locked

### Account / Company

- Company name [String, required]
- Address [String, required]
- Post Code [String, required]
- City [String, required]
- Email [String, required]
- Website [String, optional]
- Phone [String, required]
- CVR / VAT [String, optional]
- Status [Company Status Schema, required]
- Type [CRM Type Schema, required]
- Means of contact [Contact Type Schema, multi, required]
- Contacts [Company Contact Schema, multi, required]
- Pipelines [Pipeline Schema, multi, optional]
- Broker [User Schema, required]

### Company Status

- Name [String, required]
- CompanyStatusID [Number, required]

Company status can be: Active, Inactive

### CRM Type

- Name [String, required]
- CRMTypeID [Number, required]

CRM Type can be: Lead, Prospect, Client

### Contact Type

- Name [String, required]
- ContactTypeID [Number, required]

Contact Type can be: Personal, Email, Phone, SMS, Other

### Company Contact

- Company [Company Schema, ID, required]
- Name [String, required]
- Surname [String, required]
- Position [String, required]
- Email [String, required]
- Phone [String, required]
- Tags [String, multi, optional]

### Pipeline

- Company [Company Schema, ID, required]
- Name [String, required]
- Value [Number, required]
- Progress [Pipeline Progress Schema, multi, optional]
- Closing Date [ISO Date, required]
- Follow-up Date [ISO date, optional]
- Notes [String, optional]
- Stage [Pipeline Stage Schema, required]
- Description [String, optional]
- Status [Pipeline Status Schema, required]

### Pipeline Progress

- Name [String, required]
- PipelineProgressID [Number, required]

Pipeline Progress can be: Prospecting, Lead Qualification, Demo or Meeting, Pitch, Negotiation, Opportunity Won, Subsequent Purchase

### Pipeline Status

- Name [String, required]
- PipelineStatusID [Number, required]

Pipeline Status can be: Active, Inactive, Won, Lost, Affected
