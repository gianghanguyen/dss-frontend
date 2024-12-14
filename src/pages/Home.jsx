import { Box, Container } from "@mui/material";
import SearchFilter from "../components/SearchFilter";
import Detail from "../components/Detail";

export default function Home() {
  const data = [
    {
      "_id": 2496678016235342,
      "company_id": "6755b78c41d14f5ef4a5d273",
      "job_title": "Systems Analyst",
      "experience": 5,
      "salary": 95000,
      "location_point": 0.5997487611969975,
      "company_size_point": 0.983975431473591,
      "job_title_point": 0.9544976008988507,
      "experience_point": 1,
      "salary_point": 0.9743589743589743,
      "weighted_location_point": 0.05997487611969975,
      "weighted_company_size_point": 0.1967950862947182,
      "weighted_job_title_point": 0.19089952017977016,
      "weighted_experience_point": 0.2,
      "weighted_salary_point": 0.09743589743589744,
      "point": 0.7451053800300856
    },
    {
      "_id": 709879377895093,
      "company_id": "6755b78d41d14f5ef4a5e301",
      "job_title": "Investment Banker",
      "experience": 5,
      "salary": 82500,
      "location_point": 0.7333663269989457,
      "company_size_point": 0.9976725336664659,
      "job_title_point": 0.9300564568084083,
      "experience_point": 1,
      "salary_point": 0.8461538461538461,
      "weighted_location_point": 0.07333663269989457,
      "weighted_company_size_point": 0.1995345067332932,
      "weighted_job_title_point": 0.18601129136168168,
      "weighted_experience_point": 0.2,
      "weighted_salary_point": 0.08461538461538462,
      "point": 0.7434978154102542
    },
    {
      "_id": 1382794347389625,
      "company_id": "6755b78c41d14f5ef4a5d7d5",
      "job_title": "Marketing Analyst",
      "experience": 5,
      "salary": 80500,
      "location_point": 0.6029807454569275,
      "company_size_point": 0.9960514868271354,
      "job_title_point": 1,
      "experience_point": 1,
      "salary_point": 0.8256410256410256,
      "weighted_location_point": 0.06029807454569275,
      "weighted_company_size_point": 0.19921029736542709,
      "weighted_job_title_point": 0.2,
      "weighted_experience_point": 0.2,
      "weighted_salary_point": 0.08256410256410257,
      "point": 0.7420724744752225
    },
    {
      "_id": 403905917698739,
      "company_id": "6755b78c41d14f5ef4a5d648",
      "job_title": "Marketing Analyst",
      "experience": 5,
      "salary": 94000,
      "location_point": 0.5812510427121121,
      "company_size_point": 0.9352919743309464,
      "job_title_point": 1,
      "experience_point": 1,
      "salary_point": 0.9641025641025641,
      "weighted_location_point": 0.05812510427121122,
      "weighted_company_size_point": 0.18705839486618928,
      "weighted_job_title_point": 0.2,
      "weighted_experience_point": 0.2,
      "weighted_salary_point": 0.09641025641025641,
      "point": 0.741593755547657
    },
    {
      "_id": 2721847287136778,
      "company_id": "6755b78d41d14f5ef4a5e464",
      "job_title": "Project Coordinator",
      "experience": 5,
      "salary": 93000,
      "location_point": 0.6309889783486722,
      "company_size_point": 0.9588715134479964,
      "job_title_point": 0.9542915093603532,
      "experience_point": 1,
      "salary_point": 0.9538461538461539,
      "weighted_location_point": 0.06309889783486722,
      "weighted_company_size_point": 0.19177430268959927,
      "weighted_job_title_point": 0.19085830187207065,
      "weighted_experience_point": 0.2,
      "weighted_salary_point": 0.0953846153846154,
      "point": 0.7411161177811525
    },
    {
      "_id": 2195650094493214,
      "company_id": "6755b78d41d14f5ef4a5dd55",
      "job_title": "Marketing Analyst",
      "experience": 5,
      "salary": 88500,
      "location_point": 0.5779791858183984,
      "company_size_point": 0.9625820747912345,
      "job_title_point": 1,
      "experience_point": 1,
      "salary_point": 0.9076923076923077,
      "weighted_location_point": 0.05779791858183984,
      "weighted_company_size_point": 0.1925164149582469,
      "weighted_job_title_point": 0.2,
      "weighted_experience_point": 0.2,
      "weighted_salary_point": 0.09076923076923077,
      "point": 0.7410835643093174
    },
    {
      "_id": 2085483493426293,
      "company_id": "6755b78d41d14f5ef4a5df59",
      "job_title": "Project Coordinator",
      "experience": 5,
      "salary": 84500,
      "location_point": 0.6516912483553573,
      "company_size_point": 0.9915898900216388,
      "job_title_point": 0.9542915093603532,
      "experience_point": 1,
      "salary_point": 0.8666666666666667,
      "weighted_location_point": 0.06516912483553573,
      "weighted_company_size_point": 0.19831797800432777,
      "weighted_job_title_point": 0.19085830187207065,
      "weighted_experience_point": 0.2,
      "weighted_salary_point": 0.08666666666666667,
      "point": 0.7410120713786008
    }
  ];

  return (
    <div>
      <Container maxWidth="lg" sx={{ marginLeft: "8px" }}>
        <Box display="flex" flexDirection="row">
          <SearchFilter />
        </Box>
      </Container>
      <Detail jobData={data} />
    </div>
  );
}

