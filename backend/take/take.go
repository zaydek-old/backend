package take

import (
	"math/rand"
	"time"
)

func init() {
	rand.Seed(time.Now().UnixNano()) // this ensures 'randomness' from run-to-run
}

// RandStr takes a random string from a *[]string.
// If the length of p's []string is empty, it repopulates from src.
func RandStr(p *[]string, src []string) string {
	if len(*p) == 0 {
		*p = make([]string, len(src))
		copy(*p, src)
	}
	n := rand.Intn(len(*p))
	took := (*p)[n]
	*p = append((*p)[:n], (*p)[n+1:]...)
	return took
}

type genFunc func() (string, string)

// RandStrsGen returns a func that takes two random strings from a []string.
// If the returned func is not nil, it works forever and cannot err.
func RandStrsGen(a []string) genFunc {
	if len(a) < 4 {
		return nil // edge-case
	}
	var state []string
	var prev1, prev2 string
	var gen genFunc
	gen = func() (string, string) {
		curr1, curr2 := RandStr(&state, a), RandStr(&state, a)
		if false ||
			curr1 == curr2 || // a)     •p1  •p2  d) •p1  •p2 <- prev
			curr1 == prev1 || // b)     |    |         \ /
			curr2 == prev2 || // c)  b) | c) |          X
			curr1 == prev2 || // d)     |    |         / \
			curr2 == prev1 || // e)  a) •c1--•c2  e) •c1  •c2 <- curr
			false {
			return gen()
		}
		prev1, prev2 = curr1, curr2
		return curr1, curr2
	}
	// gen is a func that returns two strings
	// if it was not returned as nil, it cannot err
	// e.g. s1, s2 := gen()
	return gen
}
