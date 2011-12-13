module( 'Bump.Vector3' );

test( 'Bump.Vector3 exists', 1, function() {
    ok( Bump.Vector3, 'Bump.Vector3 exists' );
} );

test( 'functions exist', 8, function() {
    ok( Bump.Vector3.create, 'create exists' );
    ok( Bump.Vector3.add, 'add exists' );
    ok( Bump.Vector3.subtract, 'subtract exists' );
    ok( Bump.Vector3.multiply, 'multiply exists' );
    ok( Bump.Vector3.divide, 'divide exists' );
    ok( Bump.Vector3.dot, 'dot exists' );
    ok( Bump.Vector3.length2, 'length2 exists' );
    ok( Bump.Vector3.length, 'length exists' );
} );

module( 'Bump.Vector3.create' );

test( 'create produces arrays', 2, function() {
    deepEqual( Bump.Vector3.create(), [0, 0, 0] );
    deepEqual( Bump.Vector3.create(1, 2, 3), [1, 2, 3] );
} );

module( 'Bump.Vector3 math functions' );

test( 'add function', 2, function() {
  var v1 = Bump.Vector3.create(1, 2, 3),
  v2 = Bump.Vector3.create(1, -2, 0),
  v3 = Bump.Vector3.create();

    Bump.Vector3.add(v1, v2, v3);
    deepEqual(v3, [2, 0, 3], 'add with destination works');

    Bump.Vector3.add(v1, v2);
    deepEqual(v1, [2, 0, 3], 'add in place works');
} );

test( 'subtract function', 2, function() {
  var v1 = Bump.Vector3.create( 1, 2, 3 ),
  v2 = Bump.Vector3.create( 1, -2, 0 ),
  v3 = Bump.Vector3.create();

    Bump.Vector3.subtract( v1, v2, v3 );
    deepEqual( v3, [0, 4, 3], 'subtract with destination works');

    Bump.Vector3.subtract( v1, v2 );
    deepEqual( v1, [0, 4, 3], 'subtract in place works');
} );

test( 'multiply function', 2, function() {
  var v1 = Bump.Vector3.create( 1, 2, 3 ),
  v2 = Bump.Vector3.create();

  Bump.Vector3.multiply( v1, 2, v2 );
  deepEqual(v2, [2, 4, 6], 'multiply with destination works');

  Bump.Vector3.multiply( v1, 2 );
  deepEqual(v1, [2, 4, 6], 'multiply in place works');
} );

test( 'divide function', 2, function() {
  var v1 = Bump.Vector3.create( 1, 2, 3 ),
  v2 = Bump.Vector3.create();

  Bump.Vector3.divide( v1, 2, v2 );
  deepEqual(v2, [0.5, 1, 1.5], 'divide with destination works');

  Bump.Vector3.divide( v1, 2 );
  deepEqual(v1, [0.5, 1, 1.5], 'divide in place works');
} );

test( 'dot function', 1, function() {
  var v1 = Bump.Vector3.create( 1, 1, 1 ),
  v2 = Bump.Vector3.create( 2, 2, 2 );
  equal( Bump.Vector3.dot( v1, v2 ), 6 );
} );

test( 'length2 function', 1, function() {
  var v1 = Bump.Vector3.create( 1, 2, 3 );
  equal( Bump.Vector3.length2( v1 ), 14 );
} );

test( 'length function', 1, function() {
  var v1 = Bump.Vector3.create( 1, 2, 3 );
  equal( Bump.Vector3.length( v1 ), Math.sqrt( 14 ) );
} );