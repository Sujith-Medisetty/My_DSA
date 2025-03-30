# ***All the below diagrams and notes is based on the assumptions and we can make the changes as needed , there is no strict structure for these ***

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

# Design a URL Shortener like TinyURL

## Problem Statement
A URL shortener converts long URLs into short, shareable links (e.g., bit.ly/xyz123).

## Key Features
- **Shorten long URLs**
- **Redirect short URLs to original URLs**
- **Optional Features:**
  - Analytics
  - Custom aliases
  - Expiry settings
  - User accounts

## Functional Requirements
### Shorten URL:
- Generate a short key (e.g., abc123) for a long URL.
- Support custom aliases (e.g., short.com/mylink).

### Redirect:
- Resolve short.com/abc123 → original URL.

### Optional:
- User accounts to manage links.
- Set expiration time.
- Track click analytics.
- API for developers.

## Non-Functional Requirements
- **Low Latency:** Redirects in <100ms.
- **High Availability:** 99.99% uptime.
- **Scalability:** Handle millions of URLs/day.
- **Durability:** Never lose a URL.
- **Unpredictable Keys:** Prevent guessing/abuse.

## Capacity Estimation
### Assumptions:
- **Daily Active Users (DAU):** 1 million
- **New URLs/day:** 500K
- **Read (redirects)/write ratio:** 100:1 (50M redirects/day)
- **Avg URL length:** 500 bytes (long) + 10 bytes (short key)

### Storage:
- **Daily URLs:**
  - 500K/day * (500B + 10B) = ~250 MB/day
  - Yearly: ~90 GB.
- **Metadata (user, expiry, clicks):** ~50B/URL → 25 MB/day.

### Bandwidth:
- **Redirects:**
  - 50M/day * 500B (original URL) = ~25 GB/day.
- **Writes:** Negligible.

## Key Components
### Short Key Generation:
- **Hash-based:** MD5/SHA-1 + base62 encoding (e.g., abc123).
- **Counter-based:** Distributed ID generator (e.g., Snowflake).
- **Custom Aliases:** Validate uniqueness.

### Database:
- **SQL (PostgreSQL):** Store short_key → long_url, user data.
- **Cache (Redis):** Hot URLs (10M entries, TTL).

### Redirect Flow:
- Client → CDN → Load Balancer → App Server → Redis → DB → 301 Redirect.

### Optional:
- **Analytics:** Log clicks (Kafka + Flink + Time-series DB).
- **Expiry:** Background job to purge old links.

## Database Schema
```sql
TABLE urls (
  id BIGINT PRIMARY KEY,
  short_key VARCHAR(10) UNIQUE,
  long_url TEXT,
  user_id BIGINT,
  created_at TIMESTAMP,
  expires_at TIMESTAMP,
  clicks BIGINT DEFAULT 0
);

TABLE users (
  id BIGINT PRIMARY KEY,
  email VARCHAR(255),
  api_key VARCHAR(64)
);
```

## APIs
### Shorten URL:
```json
POST /api/shorten
{
  "url": "https://long.com/...",
  "custom_alias": "mylink"  // Optional
}
```
Response: `{ "short_url": "short.com/abc123" }`

### Redirect:
```json
GET /abc123 → 301 Redirect to long URL.
```

## Scaling Tricks
- **Read-heavy?** Cache 99% traffic in Redis.
- **Write-heavy?** Use DB sharding by short_key hash.
- **Key Collisions?** Retry with salted hash.
- **Global latency?** Use CDN (Cloudflare).

## Alternate Designs
- **NoSQL (DynamoDB):** If metadata is simple.
- **Zookeeper:** For distributed ID generation.

## Final Thoughts
This design ensures a scalable, reliable, and low-latency URL shortener. Key decisions:
- Use Redis for caching popular URLs.
- Shard database for high availability.
- Background jobs for expired link deletion.
- Optional analytics for tracking user interactions.

```text
┌─────────────────────────────────────────────────────────────────────┐
│                          URL Shortener                              │
│                                                                     │
│  ┌─────────────┐    ┌─────────────┐    ┌───────────────────────┐   │
│  │    Client   │    │    CDN      │    │   Load Balancer       │   │
│  │  (Web/API)  ├───►│ (Caching)   ├───►│  (Routes Traffic)     │   │
│  └─────────────┘    └─────────────┘    └───────────┬───────────┘   │
│                                                     │               │
│  ┌──────────────────────────────────────────────────▼───────┐       │
│  │                  Application Servers                     │       │
│  │  ┌─────────────┐    ┌──────────────────────────┐         │       │
│  │  │   Auth      │    │   URL Shortening Service │         │       │
│  │  │  Service    │    │  (Key Generation, DB)    │         │       │
│  │  └─────────────┘    └─────────────┬────────────┘         │       │
│  └───────────────────────────────────┼──────────────────────┘       │
│                                      │                              │
│  ┌───────────────────────────────────▼───────┐                      │
│  │            Cache (Redis)                 │                      │
│  │  (Frequent URL mappings, 10M entries)    │                      │
│  └───────────────────┬──────────────────────┘                      │
│                      │                                             │
│  ┌───────────────────▼──────────────────────┐    ┌───────────────┐ │
│  │          Relational DB (PostgreSQL)      │    │  Analytics DB │ │
│  │  (URL mappings, user data, metadata)     │    │  (Time-series)│ │
│  └──────────────────────────────────────────┘    └───────────────┘ │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

# Design a Leaderboard System

## Problem Statement
A leaderboard system ranks users based on scores and updates in real-time. It is commonly used in various applications:

### Example Use Cases:
- **Gaming:** Ranking top players based on scores.
- **Competitions:** Coding challenges like LeetCode.
- **E-commerce:** Top sellers based on revenue.

## Requirements

### Functional Requirements
- **Update Score:** Record a user’s new score.
- **Get Top N Players:** Return a ranked list (e.g., top 100).
- **Get User Rank:** Fetch rank by user ID.
- **Optional Features:**
  - Time-windowed leaderboards (daily/weekly/monthly rankings).
  - Pagination for ranks beyond the top N (e.g., fetch ranks 101-200).

### Non-Functional Requirements
- **Low Latency:** <100ms for ranking queries.
- **High Throughput:** Handle 10K+ score updates per second.
- **Scalability:** Support millions of users.
- **Consistency:** Ensure strong consistency in ranks and scores.

## Capacity Estimation
### Assumptions:
- **10M daily active users.**
- **1M score updates per second (peak).**
- **Read-to-write ratio:** 10:1 (10M reads/sec).
- **Data per user:**
  - User ID: 8 bytes
  - Score: 4 bytes
  - Name: 20 bytes
  - **Total per user:** 32 bytes
- **Total storage requirement:**
  - 10M users * 32B = 320MB (fits in RAM for real-time processing).

## APIs

### Update Score:
```http
POST /api/score
{
  "user_id": "123",
  "score": 1000
}
```

### Get Top N Players:
```http
GET /api/leaderboard?limit=100
```
**Response:**
```json
[
  { "user_id": "456", "score": 2000, "rank": 1 },
  { "user_id": "123", "score": 1000, "rank": 2 }
]
```

### Get User Rank:
```http
GET /api/rank?user_id=123
```
**Response:**
```json
{
  "rank": 2,
  "score": 1000
}
```

This design ensures an efficient, scalable, and real-time leaderboard system.

```text
┌─────────────────────────────────────────────────────────────────────┐
│                          Leaderboard Service                        │
│                                                                     │
│  ┌─────────────┐    ┌─────────────┐    ┌───────────────────────┐   │
│  │    Client   │    │   CDN/      │    │   Load Balancer       │   │
│  │  (Game/App) ├───►│  Cache      ├───►│  (Distributes Traffic)│   │
│  └─────────────┘    └─────────────┘    └───────────┬───────────┘   │
│                                                     │               │
│  ┌──────────────────────────────────────────────────▼───────┐       │
│  │                  Application Servers                     │       │
│  │  ┌─────────────┐    ┌──────────────────────────┐         │       │
│  │  │   Auth      │    │   Leaderboard Service    │         │       │
│  │  │  Service    │    │  (Score Updates, Ranks)  │         │       │
│  │  └─────────────┘    └─────────────┬────────────┘         │       │
│  └───────────────────────────────────┼──────────────────────┘       │
│                                      │                              │
│  ┌───────────────────────────────────▼───────┐    ┌───────────────┐ │
│  │            Sorted Set (Redis)             │    │  Database     │ │
│  │  (Stores scores + ranks in real-time)     │    │  (PostgreSQL) │ │
│  └───────────────────────────────────────────┘    └───────────────┘ │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```
