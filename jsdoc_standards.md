# JSDoc/Swagger Documentation Standards for Paperless-AI API

The following detailed standard is what all API route documentation should adhere to:

## 1. Basic Structure and Format

Every route in the API must be documented with a JSDoc comment block using the `@swagger` tag following the OpenAPI 3.0.0 specification. The documentation should be placed immediately before the route handler function.

```javascript
/**
 * @swagger
 * /path/to/endpoint:
 *   method:
 *     // Documentation content
 */
router.method('/path/to/endpoint', async (req, res) => {
```

## 2. Core Documentation Elements

### 2.1 Route Path Definition

- The route path must match exactly the path defined in the Express route handler
- Path parameters should be defined using curly braces: `/path/{paramName}`
- Trailing slashes should be avoided for consistency

### 2.2 HTTP Method

- The HTTP method (get, post, put, delete) should be indented under the path
- Only one method should be defined per documentation block
- Multiple methods for the same path should be documented separately

### 2.3 Summary and Description

- Every endpoint must have a clear, concise `summary` field (single line)
- A more detailed `description` field using the pipe symbol (`|`) for multi-line content
- The description should:
  - Explain the purpose of the endpoint in 2-3 sentences
  - Describe key functionality and behaviors
  - Note any important side effects or dependencies
  - Use proper grammar and complete sentences
  - For complex endpoints, include usage examples or explanations of how the endpoint works in the larger application context

Example:
```javascript
/**
 * @swagger
 * /api/example:
 *   get:
 *     summary: Brief description of what this endpoint does
 *     description: |
 *       Detailed explanation of the endpoint functionality.
 *       This should cover what the endpoint does, how it works,
 *       and any important behaviors users should know about.
 *       
 *       Use multiple paragraphs for complex explanations.
 */
```

## 3. Tags and Categorization

### 3.1 Tag Requirements

- Each endpoint must be assigned to at least one tag, often multiple tags
- Tags must come from the predefined list of application tags defined in the `tags` section
- Multiple tags should be used when an endpoint serves multiple purposes
- Common tag combinations include:
  - `[Navigation, X]` for UI page routes
  - `[API, X]` for data API endpoints
  - `[System, Authentication]` for security-related endpoints

### 3.2 Defined Tags

The application uses the following tags for categorization:
- Authentication - User authentication and authorization endpoints
- Documents - Document management and processing endpoints
- History - Document processing history and tracking
- Navigation - General navigation endpoints for the web interface
- System - Configuration, health checks, and administrative functions
- Chat - Document chat functionality
- Setup - Application setup and configuration
- Metadata - Endpoints for managing document metadata
- API - General API endpoints (usually combined with other tags)

## 4. Security Requirements

### 4.1 Security Definitions

- Each protected endpoint must include appropriate security requirements
- The application supports two authentication methods:
  - `BearerAuth` - JWT-based authentication for web app users
  - `ApiKeyAuth` - API key authentication for programmatic access

### 4.2 Security Requirement Format

Security requirements should be specified in the standard format:
```javascript
 *     security:
 *       - BearerAuth: []
 *       - ApiKeyAuth: []
```

### 4.3 Security Notices

- For endpoints that modify security settings (like key regeneration), include explicit security notices
- Format these as bold text in the description using Markdown: `**Security Notice**: Important information.`

## 5. Parameters Documentation

### 5.1 Path Parameters

Path parameters should be documented with:
- Parameter name matching the path definition
- Schema type (integer, string, etc.)
- Required flag (almost always true for path parameters)
- Description of the parameter purpose
- Example value

```javascript
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The resource ID
 *         example: 123
```

### 5.2 Query Parameters

Query parameters follow a similar format but include:
- Default values where applicable
- Enumerated values if the parameter has a restricted set of options

```javascript
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Maximum number of records to return
```

### 5.3 Request Body

For POST/PUT endpoints, document the request body with:
- Required flag
- Content type (usually application/json)
- Schema definition including:
  - Required properties list
  - Property definitions with types
  - Property descriptions
  - Example values

```javascript
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - propertyName
 *             properties:
 *               propertyName:
 *                 type: string
 *                 description: Description of the property
 *                 example: "Example value"
```

## 6. Response Documentation

### 6.1 Response Status Codes

Each endpoint must document all possible response status codes:
- 200/201 for successful operations
- 400 for invalid requests
- 401 for authentication failures
- 403 for authorization failures
- 404 for resource not found
- 500 for server errors
- Any other status code the endpoint might return

### 6.2 Response Content

For each status code, document:
- Description of what the status code means in this specific context
- Content type of the response
- Schema definition of the response body
- For complex responses, use schema references to components

```javascript
 *     responses:
 *       200:
 *         description: Detailed description of successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseSchema'
```

### 6.3 Streaming Responses

For streaming endpoints (like chat), document:
- The streaming nature of the response
- The format of each chunk
- Examples of the stream events

```javascript
 *       200:
 *         description: |
 *           Response streaming started. Each event contains a message chunk.
 *         content:
 *           text/event-stream:
 *             schema:
 *               type: string
 *               example: |
 *                 data: {"chunk":"Example response chunk"}
 *                 
 *                 data: {"done":true}
```

## 7. Schema Definitions and References

### 7.1 Schema Components

- Complex object schemas should be defined as components in a central schema file
- These components should be referenced using `$ref` syntax
- Common schemas like Error responses should always use references

```javascript
 *               schema:
 *                 $ref: '#/components/schemas/Error'
```

### 7.2 Inline Schemas

- Simple response schemas can be defined inline
- Include:
  - Object type
  - Properties with types and descriptions
  - Example values for each property

```javascript
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     description: Whether the operation succeeded
 *                     example: true
```

### 7.3 Array Schemas

Arrays should specify the item type, either as a reference or inline schema:

```javascript
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Item'
```

## 8. Documentation Style and Formatting

### 8.1 Indentation and Formatting

- Consistent indentation using 2 spaces
- Proper nesting of OpenAPI elements
- Clear separation between different documentation sections

### 8.2 Naming Conventions

- Use camelCase for property names in schemas
- Use snake_case for query parameter names
- Use descriptive names for all elements

### 8.3 Example Values

- Every property should include a realistic example value
- Examples should demonstrate typical usage
- For enums, example should be one of the allowed values

## 9. Special Documentation Types

### 9.1 Page Routes (Navigation)

For routes that render HTML pages:
- Tag with [Navigation] and relevant feature tag
- Document the purpose of the page
- Note any data dependencies

### 9.2 API Data Endpoints

For pure data API endpoints:
- Tag with [API] and relevant feature tag
- Document the data structure comprehensively
- Include pagination details if applicable

### 9.3 Authentication Endpoints

For authentication-related endpoints:
- Tag with [Authentication]
- Include detailed security considerations
- Document token/session behaviors

## 10. Documentation Quality Standards

### 10.1 Completeness

- No undocumented parameters or responses
- All possible response codes covered
- All security requirements specified

### 10.2 Accuracy

- Documentation must match actual implementation
- Examples must be valid for the described schema
- Security requirements must reflect actual restrictions

### 10.3 Consistency

- Similar endpoints should follow similar documentation patterns
- Standard responses (like errors) should be documented identically
- Terminology should be consistent across all endpoints

This comprehensive standard ensures that all API documentation in the Paperless-AI application is thorough, consistent, and user-friendly, providing developers with all the information they need to use the API effectively.

