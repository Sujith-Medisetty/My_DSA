*** # All the below diagrams and notes is based on the assumptions and we can make the changes as needed , there is no strict structure for these ***

# Design a Text Storage Service like Pastebin

## Problem Statement
Pastebin is a web service that allows users to store plain text or code snippets, typically for sharing with others. Users can create "pastes," which are stored under a unique URL. These pastes can be public, unlisted, or private, and they can expire after a certain time or remain indefinitely.

## Key Features
- **User Authentication:** Users can sign up and log in to manage their pastes.
- **Create Paste:** Users can upload text/code snippets with optional settings (expiry, visibility).
- **Read Paste:** Anyone with the URL can view the paste (if public/unlisted).
- **Edit/Delete Paste:** Owners can modify or delete their pastes.
- **Expiration:** Pastes can auto-delete after a set time.
- **Syntax Highlighting:** For code snippets.
- **API Access:** Developers can interact with the service programmatically.

## Functional Requirements
### User Management:
- Sign up, log in, log out.
- User profile management.

### Paste Management:
- Create, read, update, delete pastes.
- Set expiry time (e.g., 1 hour, 1 day, never).
- Set visibility (public, unlisted, private).

### Paste Viewing:
- View raw text or formatted (syntax highlighting).
- Track view counts.

### Search & Discovery:
- Search public pastes (optional).

### API Support:
- REST/GraphQL API for programmatic access.

## Non-Functional Requirements
- **Availability:** 99.9% uptime (highly available).
- **Durability:** No data loss (reliable storage).
- **Low Latency:** Fast read/write operations (<500ms).
- **Scalability:** Handle millions of pastes and high traffic.
- **Security:** Encrypted storage, rate limiting, DDoS protection.
- **Cost-Effective:** Optimize storage and compute costs.

## Capacity Estimation
### Assumptions:
- **Daily Active Users (DAU):** 1 million
- **Pastes Created per Day:** 500,000
- **Average Paste Size:** 10 KB
- **Read-to-Write Ratio:** 10:1 (5M reads/day)

### Storage Estimation:
- **Daily Storage Growth:** 500,000 pastes/day * 10 KB = 5 GB/day
- **Monthly Storage:** 5 GB/day * 30 = 150 GB/month
- **Yearly Storage:** ~1.8 TB/year

### Bandwidth Estimation:
- **Read Traffic:** 5M reads/day * 10 KB = 50 GB/day (~1.5 TB/month)
- **Write Traffic:** 500K writes/day * 10 KB = 5 GB/day (~150 GB/month)

### Database Requirements:
- **Paste Metadata (ID, user_id, expiry, visibility, etc.):** ~1 KB per paste.
- **Total Metadata Storage:** 500K/day * 1 KB = 0.5 GB/day (~15 GB/month)

## Database Choice
### Relational Database (PostgreSQL/MySQL):
- Store user data and paste metadata (ID, user_id, expiry, visibility).
- Strong consistency for user operations.

### Object Storage (S3/Blob Storage):
- Store raw paste content (scalable, cheap).

### Cache (Redis):
- Cache frequently accessed pastes to reduce DB load.

## APIs
### Create Paste:
```json
POST /api/paste
{
  "content": "Hello, world!",
  "expiry": "1d",
  "visibility": "public",
  "syntax": "plaintext"
}
```
### Get Paste:
```json
GET /api/paste/{id}
```
### Delete Paste:
```json
DELETE /api/paste/{id}
```

## Key Services
- **Auth Service:** Handles user signup/login (JWT/OAuth).
- **Paste Service:** Manages paste CRUD operations.
- **Search Service (Optional):** Indexes public pastes.
- **Expiry Service:** Background job to delete expired pastes.
- **CDN:** Caches popular pastes for low-latency reads.

## Scaling Considerations
- **Sharding:** Distribute paste metadata by user_id or paste_id.
- **Replication:** Multiple DB replicas for read scalability.
- **Rate Limiting:** Prevent abuse (e.g., 100 pastes/user/day).

## Final Thoughts
This design ensures a scalable, reliable, and low-latency text storage service like Pastebin. Key decisions:
- Separate metadata (SQL) and content (S3) for cost efficiency.
- Redis caching for hot pastes.
- CDN for global low-latency access.
- Background expiry job to clean up old pastes.
```text
┌─────────────────────────────────────────────────────────────────────────┐
│                            Text Storage Service                         │
│                                                                         │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────────────────────┐  │
│  │    Client   │    │    CDN      │    │    Load Balancer            │  │
│  │  (Web/API)  ├───►│ (Caching)   ├───►│  (Distributes Traffic)      │  │
│  └─────────────┘    └─────────────┘    └───────────────┬─────────────┘  │
│                                                        │                │
│  ┌─────────────────────────────────────────────────────▼───────┐        │
│  │                     Application Servers                     │        │
│  │  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │        │
│  │  │   Auth      │    │   Paste     │    │   Search     │     │        │
│  │  │  Service    │    │  Service    │    │  Service     │     │        │
│  │  └─────────────┘    └─────────────┘    └─────────────┘     │        │
│  └─────────────┬───────────────────────────────┬───────────────┘        │
│                │                               │                        │
│  ┌─────────────▼───────┐         ┌─────────────▼─────────────┐          │
│  │   Relational DB     │         │   Object Storage (S3)     │          │
│  │  (Users, Metadata)  │         │  (Raw Paste Content)      │          │
│  └─────────────┬───────┘         └───────────────────────────┘          │
│                │                                                        │
│  ┌─────────────▼───────┐                                               │
│  │   Cache (Redis)     │                                               │
│  │  (Frequent Pastes)  │                                               │
│  └─────────────────────┘                                               │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```
