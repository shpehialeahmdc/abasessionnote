CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    dob DATE NOT NULL,
    medicaid_number VARCHAR(50),
    diagnosis TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE assessments (
    id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES clients(id),
    assessment_type VARCHAR(50),
    assessment_date DATE,
    pdf_path TEXT,
    parsed_data JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sessions (
    id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES clients(id),
    session_date DATE,
    start_time TIME,
    end_time TIME,
    environment VARCHAR(50)[],
    participants TEXT[],
    emotional_state TEXT,
    medical_concerns TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE abc_data (
    id SERIAL PRIMARY KEY,
    session_id INTEGER REFERENCES sessions(id),
    antecedent TEXT,
    behavior TEXT,
    consequence TEXT,
    intervention TEXT[],
    reinforcers TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reinforcement_schedules (
    id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES clients(id),
    schedule_type VARCHAR(50),
    reinforcer_type VARCHAR(50),
    reinforcer_items TEXT[],
    schedule_details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);