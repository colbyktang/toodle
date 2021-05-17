package com.example.demo.Applicant;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


public interface ApplicantRepository extends  MongoRepository<Applicant, String>{
    //checking for user in the database by username and email
//    public Applicant findByUsername(String username);
//    public Applicant findByEmail(String email);
}
