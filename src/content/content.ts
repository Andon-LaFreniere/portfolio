export type Experience = { role: string; company: string; period: string; bullets: string[] };
export type Project = { title: string; description: string; stack: string[]; status?: string; links: { label: string; href: string }[] };

export const profile = {
  name: "Andon [TODO last name]",
  intro: "Computer Science student at The Ohio State University (Honors Program), Mathematics minor.",
  expected: "Expected May 2028",
  email: "[TODO email]",
  github: "[TODO GitHub link]",
  linkedin: "[TODO LinkedIn link]",
  resume: "[TODO resume PDF link]",
};

export const experience: Experience[] = [
  { role: "Software Engineering Intern", company: "American Electric Power (AEP)", period: "[TODO dates]", bullets: ["Full-stack performance optimization.", "[TODO quantified impact bullet]", "[TODO quantified impact bullet]"] },
  { role: "IT Intern", company: "Sabel Systems", period: "[TODO dates]", bullets: ["[TODO responsibility or outcome]", "[TODO responsibility or outcome]"] },
];

export const projects: Project[] = [
  { title: "FraudLens", description: "Real-time fraud detection platform designed around streaming feature ingestion and low-latency model serving.", stack: ["Java Spring Boot", "Kafka", "Python FastAPI", "scikit-learn", "AWS", "React", "Docker", "Terraform"], links: [{ label: "Code", href: "[TODO link]" }] },
  { title: "StreamLake", description: "Data platform built on an open-source lakehouse stack, separating durable storage from repeatable streaming and ML workflows.", stack: ["Python", "Apache Spark", "Delta Lake", "Kafka", "MLflow", "AWS S3", "FastAPI"], links: [{ label: "Code", href: "[TODO link]" }] },
  { title: "Trade Processing", description: "Stock brokerage backend with an order-matching engine that keeps trade execution logic explicit and persistence transactional.", stack: ["Java Spring Boot", "Kafka", "H2", "JPA / Hibernate"], links: [{ label: "Code", href: "[TODO link]" }] },
  { title: "Real-time Object Tracking", description: "C++ and OpenCV tracking pipeline focused on reliable frame-to-frame identity across moving objects.", stack: ["C++", "OpenCV"], status: "In progress", links: [{ label: "Code", href: "[TODO link]" }] },
];

export const education = { school: "The Ohio State University", degree: "B.S. Computer Science", minor: "Mathematics minor · Honors Program", gpa: "3.914", expected: "Expected May 2028", coursework: "[TODO coursework]" };
export const skills = { Languages: "Java · Python · C++ · TypeScript · SQL", Backend: "Spring Boot · FastAPI · REST · Kafka", "Data / ML": "Apache Spark · scikit-learn · MLflow · Delta Lake", "Cloud / DevOps": "AWS · S3 · Docker · Terraform · Git", Frontend: "React · HTML · CSS" };
export const involvement = ["VP Membership, Kappa Theta Pi", "AI Club", "Big Data Analytics Association"];
