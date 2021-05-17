package com.example.demo.Applicant;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.logging.Logger;

//this is REST endpoints handler:
@RestController
//specifying the path to the endpoint:
//@RequestMapping(path="/applicant")
public class ApplicantController {
//    private final Logger LOG = (Logger) LoggerFactory.getLogger(getClass());
    private ApplicantRepository applicantRepository;

    @Autowired
    public ApplicantController(ApplicantRepository applicantRepository){
        this.applicantRepository = applicantRepository;
    }

    //GET api endpoints: get all applicant currently in the documents from the database:
    @GetMapping("/findAllApplicants")
    public List<Applicant> getAllApplicants(){
        return applicantRepository.findAll();
    }

    //POST api endpoints:
    @PostMapping("/addApplicant")
    public String addNewApplicant(@RequestBody Applicant applicant){
        //storing the applicant into a database:
        applicantRepository.save(applicant);
        return "Added applicant with id: " + applicant.getID();
    }

    @DeleteMapping("/deleteApplicant/{id}")
    public String deleteApplicant(@PathVariable String id){
        applicantRepository.deleteById(id);
        return "Deleted applicant with id: " + id;
    }



}
