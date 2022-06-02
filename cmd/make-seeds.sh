function try()
{
    [[ $- = *e* ]]; SAVED_OPT_E=$?
    set +e
}

function throw()
{
    exit $1
}

function catch()
{
    export exception_code=$?
    (( $SAVED_OPT_E )) && set +e
    return $exception_code
}

export ERR_BAD=100

try
(
    read -p 'Seeds name: ' NAME

    yarn typeorm migration:create $NAME > /dev/null 2>&1 || throw $ERR_BAD
    mv *.ts src/infra/database/seeds 

    echo "Seeds was created successfully!"
)
catch || {
    case $exception_code in
        $ERR_BAD)
              echo -e '\033[05;31mNo changes in database schema were found\033[00;37m'
        ;;
        *)
            echo "Unknown error: $exit_code"
            throw $exit_code
        ;;
    esac
}