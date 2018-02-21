package main

import (
	"encoding/json"
	"flag"
	"log"
	"net/http"

	"backend/take"
)

var days int

func init() {
	flag.IntVar(&days, "days", 14, "") // defaults to 14 days
	flag.Parse()
}

// Day represents one day of a schedule for two employees.
type Day struct {
	Emp1 string `json:"emp1"`
	Emp2 string `json:"emp2"`
}

// Sched represents an arbitrary-length schedule for two employees.
type Sched []Day

func check(err error) {
	if err != nil {
		log.Println(err)
	}
}

// api is the handler for api (post) requests.
// it works in steps:
//   1) parse the post request
//   2) convert the json map to a []string
//   3) sort the []string per the spec
//   4) return (write) the marshaled []string to the response
//
func api(w http.ResponseWriter, r *http.Request) {
	// 1) parse the post request
	err := r.ParseForm()
	check(err)
	// 2) convert the json map to a []string
	var emps []string
	for _, emp := range r.PostForm {
		if emp[0] == "" {
			return // idempotent; break control flow
		}
		emps = append(emps, emp[0])
	}
	// 3) sort the []string per the spec
	gen := take.RandStrsGen(emps)
	var sched Sched // := make(Sched, days)
	for x := 0; x < days; x++ {
		emp1, emp2 := gen()
		sched = append(sched, Day{emp1, emp2})
	}
	// 4) return (write) the marshaled []string to the response
	err = json.NewEncoder(w).Encode(sched)
	check(err)
}

func main() {
	http.Handle("/", http.FileServer(http.Dir("frontend")))
	http.HandleFunc("/api", api)
	log.Println(http.ListenAndServe(":8080", nil))
}
